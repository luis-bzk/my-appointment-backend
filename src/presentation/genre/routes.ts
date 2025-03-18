import { Router } from 'express';
import { GenreController } from './controller';
import { GenreDataSourceImpl } from '../../infrastructure/data_sources';
import { GenreRepositoryImpl } from '../../infrastructure/repositories';

export class GenreRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new GenreDataSourceImpl();
    const repository = new GenreRepositoryImpl(dataSource);
    const controller = new GenreController(repository);

    // routes
    router.post('/create', controller.createGenre);
    router.put('/update/:id', controller.updateGenre);
    router.get('/get/:id', controller.getGenre);
    router.get('/get-all', controller.getAllGenres);
    router.delete('/delete/:id', controller.deleteGenre);

    return router;
  }
}
