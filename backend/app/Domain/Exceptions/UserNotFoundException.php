<?php

namespace App\Domain\Exceptions;

use RuntimeException;

class UserNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Usuário não encontrado.', 404);
    }
}
