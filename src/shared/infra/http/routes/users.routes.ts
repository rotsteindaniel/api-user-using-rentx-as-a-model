import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUserUseCase/UpdateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const profileUserController = new ProfileUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);
usersRoutes.put("/profile/update", ensureAuthenticated, updateUserController.handle);

export { usersRoutes };
