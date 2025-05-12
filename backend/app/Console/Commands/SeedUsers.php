<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Domain\Entities\User;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Support\Facades\Hash;

class SeedUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:seed-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function __construct(private EntityManagerInterface $em) {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::create('Administrador', 'admin@emutua.com', Hash::make('123456'));


        $this->em->persist($user);
        $this->em->flush();

        $this->info('Usuário admin criado com sucesso!');
    }
}
