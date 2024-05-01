import { Router } from "express";
import { CreateUser, GetUser, DeleteUser, GetAllUser, UpdateUser } from "../Controllers/UserController.mjs";

const route = Router();

route.post('/', CreateUser);
route.get('/:id', GetUser);
route.delete('/:id', DeleteUser);
route.get('/', GetAllUser);
route.put('/:id', UpdateUser);

export default route;