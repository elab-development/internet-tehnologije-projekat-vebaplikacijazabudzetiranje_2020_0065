<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Reimbursement;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
        $users = User::all();
        return UserResource::collection($users);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error occured while trying to display users.', 'error' => $e->getMessage()], 500);
    }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();

        $this->cacheLatestUser($user);

        return response()->json(['message' => 'User successfully created']);
        
    }

    private function cacheLatestUser(User $user)
    {
        Cache::put('latest_user', $user, now()->addMinutes(10));
    }

    public function showLatestUser()
    {
        $latestUser = $this->getLatestUser();

        return view('latest_user', compact('latestUser'));
    }

    private function getLatestUser()
    {
        $cachedUser = Cache::get('latest_user');

        if ($cachedUser) {
            return $cachedUser;
        }

        // Ako podatak nije u kešu, dohvati ga iz baze, keširaj i vrati
        $user = User::latest()->first();

        if ($user) {
            $this->cacheLatestUser($user);
        }

        return $user;
    }

    


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        
    }
    public function showReimbursements($id)
 {
 

    try {
        $reimbursements = Reimbursement::where('user_id', $id)->get();
        
        if($reimbursements->isEmpty()) {
            return response()->json(['message' => 'There are no reimbursements found for that user.'], 404);
        }

        return response()->json(['reimbursements' => $reimbursements], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error occured.', 'error' => $e->getMessage()], 500);
    }
}
}