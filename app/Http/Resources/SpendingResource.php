<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpendingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
       // return parent::toArray($request);
       return [
        'id'=>$this->resource->id,
        'description'=>$this->resource->description,
        'transaction_date'=>$this->resource->transaction_date,
        'amount'=>$this->resource->amount,
        'refund'=>$this->resource->refund,
        'paidby'=>$this->resource->paidby,

        'user_id'=>$this->resource->user_id,
        'category_id'=>$this->resource->category_id,

       ];
    }
}