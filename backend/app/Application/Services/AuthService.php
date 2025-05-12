<?php

namespace App\Application\Services;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Domain\Exceptions\UserNotFoundException;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\JsonResponse;

class AuthService
{
    public function __construct(private UserRepositoryInterface $users) {}

    public function login(string $email, string $password): array
    {
        $user = $this->users->findByEmail($email);

        if (!$user || !Hash::check($password, $user->getPassword())) {
            throw new UserNotFoundException();
        }

        $token = JWTAuth::fromUser($user);

        return [
            'token' => $token,
            'user' => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail(),
            ],
        ];
    }

    public function me(): JsonResponse
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user->toArray());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
    }


    public function logout(): void
    {
        $token = JWTAuth::getToken();
        $invalidated = JWTAuth::invalidate($token);
    }
}
