<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Friend;
use App\Http\Resources\FriendResource;

class FriendController extends Controller
{
    public function index()
    {
        try {
            $friends = Friend::all();
            return FriendResource::collection($friends);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error occured while trying to display users.', 'error' => $e->getMessage()], 500);
        }
}

public function store(Request $request)
    {
        $friends = new Friend();
        $friends->id = $request->input('id');
        $friends->name = $request->input('name');
        $friends->image = $request->input('image');
        $friends->balance = $request->input('balance');
        $friends->email = $request->input('email');
        $friends->save();

        

        return response()->json(['message' => 'Friend successfully created']);
        
    }

    public function update(Request $request, $id, $dug)
{
    try {
        $friend = Friend::find($id);

        if (!$friend) {
            return response()->json(['message' => 'Friend not found'], 404);
        }

        $friend->name = $request->query('name', $friend->name);
        $friend->image = $request->query('image', $friend->image);
        $friend->balance = $request->query('balance', $friend->balance) + $dug;
        $friend->email = $request->query('email', $friend->email);

        // Additional validation can be performed here

        $friend->save();

        return response()->json(['message' => 'Friend successfully updated']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error occurred while trying to update friend', 'error' => $e->getMessage()], 500);
    }
}

public function destroy($id)
    {
        $friend = Friend::findOrFail($id);

        if ($friend->delete()) {
            return response()->json(['message' => 'Friend deleted succesfully'], 200);
        } else {
            return response()->json(['message' => 'Error occured, impossible to delete friend'], 500);
        }
    }

    public function paginateFriends(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 3); // željeni broj prijatelja po stranici
            $friends = Friend::paginate($perPage);
            return FriendResource::collection($friends);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error occurred while trying to paginate friends.', 'error' => $e->getMessage()], 500);
        }
    }


}


