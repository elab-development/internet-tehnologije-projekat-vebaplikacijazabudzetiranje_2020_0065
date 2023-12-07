<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable; 

class User extends Authenticatable
{
    use HasFactory;

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
