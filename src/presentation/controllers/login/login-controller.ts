import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok, serverError, unauthorized } from "../../helpers/http/http-helpers";
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from "./login-controller-protocols";

export class LoginController implements Controller {

  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor(authentication: Authentication, validation: Validation) {
    this.validation = validation    
    this.authentication = authentication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({
        email, 
        password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }  
}
