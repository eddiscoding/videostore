<?php

namespace App\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/echo')]
final class ParrotController extends AbstractController
{
    #[Route('/{msg}', name: 'api_echo')]
    public function echo(string $msg): JsonResponse
    {
        return $this->json([
            'message' => "{$msg}",
        ]);
    }
}
