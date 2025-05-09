<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Domain\Repositories\ProductRepositoryInterface;
use App\Infrastructure\Persistence\Doctrine\Repositories\ProductRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
