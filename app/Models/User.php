<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

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
