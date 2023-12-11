import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProfileUserUseCase } from "./GetProfileUserUseCase";


class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const getProfileUserUseCase = container.resolve(GetProfileUserUseCase);

    const user = await getProfileUserUseCase.execute(id);
    return response.json(user);
  }
}

export { GetUserProfileController };
