<?php

namespace App\Http\Controllers;

use App\Application\Services\ProductService;
use App\Http\Requests\ProductRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(private ProductService $service) {}

    public function index(): JsonResponse
    {
        return response()->json($this->service->list());
    }

    public function store(ProductRequest $request): JsonResponse
    {
        $this->service->create($request->validated());
        return response()->json(['message' => 'Produto criado com sucesso'], 201);
    }

    public function update(ProductRequest $request, string $id): JsonResponse
    {
        try {
            $this->service->update($id, $request->validated());
            return response()->json(['message' => 'Produto atualizado com sucesso']);
        } catch (ProductNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->service->delete($id);
            return response()->json(['message' => 'Produto removido com sucesso']);
        } catch (ProductNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
}
