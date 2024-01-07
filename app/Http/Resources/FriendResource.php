<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FriendResource extends JsonResource
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
        'name'=>$this->resource->name,
        'image'=>$this->resource->image,
        'balance'=>$this->resource->balance,
        'email'=>$this->resource->email

       ];
    }
}