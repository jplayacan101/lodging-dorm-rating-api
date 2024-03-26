import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(Email: string, Password: string): Promise<any> {
    const user = await this.usersService.findByEmail(Email);
    if (user && await bcrypt.compare(Password, user.Password)) {
      return user; // User is valid
    }
    throw new UnauthorizedException('Invalid email or password');
  }
  

  async login(Email: string, Password: string): Promise<any> {
    const user = await this.validateUser(Email, Password);
    const payload = { email: user.email, sub: user.id };
    return {
      user_id: user.UserID,
      user_name: user.Username,
      email: user.Email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
