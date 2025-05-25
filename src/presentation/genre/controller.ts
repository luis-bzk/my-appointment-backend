import { Request, Response } from 'express';

import { GenreRepository } from '../../ports/repositories';
import { BaseController } from '../BaseController';
import {
  CreateGenreUseCase,
  DeleteGenreUseCase,
  GetAllGenresUseCase,
  GetGenreUseCase,
  UpdateGenreUseCase,
} from '../../domain/use_cases/genre';

export class GenreController extends BaseController {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    super();
    this.genreRepository = genreRepository;
  }

  createGenre = async (req: Request, res: Response) => {
    try {
      const data = await new CreateGenreUseCase(this.genreRepository).execute(
        req.body,
      );

      return res.status(201).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateGenre = async (req: Request, res: Response) => {
    try {
      const data = await new UpdateGenreUseCase(this.genreRepository).execute({
        ...req.params,
        ...req.body,
      });
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getGenre = async (req: Request, res: Response) => {
    try {
      const data = await new GetGenreUseCase(this.genreRepository).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllGenres = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllGenresUseCase(this.genreRepository).execute(
        req.query,
      );
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteGenre = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteGenreUseCase(this.genreRepository).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
