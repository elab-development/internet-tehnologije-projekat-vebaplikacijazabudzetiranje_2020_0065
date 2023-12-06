<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->date('transaction_date');
        });
    }


    public function down(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropColumn('transaction_date');
        });
    }
};
