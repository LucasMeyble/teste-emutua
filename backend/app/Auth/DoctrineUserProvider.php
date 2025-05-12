<?php

namespace App\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Doctrine\ORM\EntityManagerInterface;
use App\Domain\Entities\User;
use Illuminate\Contracts\Hashing\Hasher;

class DoctrineUserProvider implements UserProvider
{
    public function __construct(
        protected EntityManagerInterface $em,
        protected Hasher $hasher
    ) {}

    public function retrieveById($identifier): ?Authenticatable
    {
        return $this->em->getRepository(User::class)->find($identifier);
    }

    public function retrieveByToken($identifier, $token) {}
    public function updateRememberToken(Authenticatable $user, $token) {}

    public function retrieveByCredentials(array $credentials): ?Authenticatable
    {
        return $this->em
            ->getRepository(User::class)
            ->findOneBy(['email' => $credentials['email']]);
    }

    public function validateCredentials(Authenticatable $user, array $credentials): bool
    {
        return $this->hasher->check($credentials['password'], $user->getPassword());
    }

    public function rehashPasswordIfRequired(Authenticatable $user, array $credentials, bool $force = false): void
    {
        if ($force || $this->hasher->needsRehash($user->getPassword())) {
            $user->setPassword($this->hasher->make($credentials['password']));
            $this->em->persist($user);
            $this->em->flush();
        }
    }
}
