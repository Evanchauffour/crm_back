import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { OpportunityModule } from './modules/opportunity/opportunity.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ClientModule, OpportunityModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
