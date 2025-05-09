<?php

namespace App\Application\Services;

use App\Domain\Entities\Product;
use App\Domain\Repositories\ProductRepositoryInterface;
use App\Domain\Exceptions\ProductNotFoundException;

class ProductService
{
    public function __construct(private ProductRepositoryInterface $repository) {}

    public function list(): array
    {
        return array_map(function (Product $product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'category' => $product->getCategory(),
            ];
        }, $this->repository->findAll());
    }

    public function create(array $data): void
    {
        $product = new Product($data['name'], $data['description'], $data['price'], $data['category']);
        $this->repository->save($product);
    }

    public function update(string $id, array $data): void
    {
        $product = $this->repository->findById($id);
        if (!$product) {
            throw new ProductNotFoundException();
        }
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);
        $product->setCategory($data['category']);

        $this->repository->update($product);
    }

    public function delete(string $id): void
    {
        $product = $this->repository->findById($id);
        if (!$product) {
            throw new ProductNotFoundException();
        }
        $this->repository->delete($product);
    }
}
