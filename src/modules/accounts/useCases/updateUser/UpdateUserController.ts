import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email } = request.body;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const updatedUser = await updateUserUseCase.execute({ id, name, email });
    return response.json({
      data: updatedUser,
      message: "user updated successfully",
    });
  }
}

export { UpdateUserController };
