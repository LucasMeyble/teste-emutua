<?php

namespace App\Http\Controllers;

use App\Application\Services\AuthService;
use App\Domain\Exceptions\UserNotFoundException;
use App\Http\Requests\AuthRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthService $auth) {}

    public function login(AuthRequest $request): JsonResponse
    {
        try {
            $data = $this->auth->login(
                $request->validated()['email'],
                $request->validated()['password']
            );

            return response()->json($data);
        } catch (UserNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    public function me(): JsonResponse
    {
        return response()->json($this->auth->me());
    }

    public function logout(): JsonResponse
    {
        $this->auth->logout();
        return response()->json(['message' => 'Logout realizado com sucesso.']);
    }
}
