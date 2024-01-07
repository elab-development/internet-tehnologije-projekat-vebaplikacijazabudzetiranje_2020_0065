<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spending extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'description', 'transaction_date', 'amount', 'refund','paidby', 'user_id', 'category_id' 
    ];
}
