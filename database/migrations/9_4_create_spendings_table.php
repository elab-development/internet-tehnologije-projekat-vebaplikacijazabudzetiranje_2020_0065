<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('spendings', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->date('transaction_date');
            $table->decimal('amount', 10, 2);
            $table->decimal('refund', 8, 2);
            $table->string('paidby');

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    
    Schema::dropIfExists('spendings');
}
};
