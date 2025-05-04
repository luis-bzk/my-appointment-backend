import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import {
  CreateGenreDto,
  DeleteGenreDto,
  GetAllGenresDto,
  GetGenreDto,
  UpdateGenreDto,
} from '../../domain/dtos/genre';
import {
  CreateGenre,
  DeleteGenre,
  GetAllGenres,
  GetGenre,
  UpdateGenre,
} from '../../domain/use_cases/genre';
import { GenreRepository } from '../../ports/repositories';

export class GenreController {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  createGenre = (req: Request, res: Response) => {
    const [error, createGenreDto] = CreateGenreDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new CreateGenre(this.genreRepository)
      .execute(createGenreDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateGenre = (req: Request, res: Response) => {
    const [error, updateGenreDto] = UpdateGenreDto.create(req.params, req.body);
    if (error) return res.status(400).json({ message: error });

    new UpdateGenre(this.genreRepository)
      .execute(updateGenreDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getGenre = (req: Request, res: Response) => {
    const [error, getGenreDto] = GetGenreDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new GetGenre(this.genreRepository)
      .execute(getGenreDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllGenres = (req: Request, res: Response) => {
    const [error, getAllGenresDto] = GetAllGenresDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    new GetAllGenres(this.genreRepository)
      .execute(getAllGenresDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteGenre = (req: Request, res: Response) => {
    const [error, deleteGenreDto] = DeleteGenreDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new DeleteGenre(this.genreRepository)
      .execute(deleteGenreDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
