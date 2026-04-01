<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\PublicidadeController;

Route::apiResource('estados', EstadoController::class);
Route::apiResource('publicidades', PublicidadeController::class);