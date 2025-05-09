<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\Product;

interface ProductRepositoryInterface
{
    public function findAll(): array;
    public function findById(string $id): ?Product;
    public function save(Product $product): void;
    public function update(Product $product): void;
    public function delete(Product $product): void;
}
