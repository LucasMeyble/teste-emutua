<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Hashing\Hasher;

use Doctrine\ORM\EntityManagerInterface;

use App\Domain\Repositories\ProductRepositoryInterface;
use App\Infrastructure\Persistence\Doctrine\Repositories\ProductRepository;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Persistence\Doctrine\Repositories\UserRepository;

use App\Auth\DoctrineUserProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Auth::provider('doctrine', function ($app, array $config) {
            return new DoctrineUserProvider(
                $app->make(EntityManagerInterface::class),
                $app->make(Hasher::class)
            );
        });
    }
}
