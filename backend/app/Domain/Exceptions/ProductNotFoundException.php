<?php

namespace App\Domain\Exceptions;

use RuntimeException;

class ProductNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Produto não encontrado.', 404);
    }
}
