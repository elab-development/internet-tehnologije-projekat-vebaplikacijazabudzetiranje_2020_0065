<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable; 

class User extends Authenticatable
{
    use HasFactory,HasApiTokens,Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];

    public function expenses() {
        return $this->hasMany(Expense::class);
    }

    public function reimbursements() {
        return $this->hasMany(Reimbursement::class);
    }

    public function groups() {
        return $this->belongsToMany(Group::class);
    }

    
}
