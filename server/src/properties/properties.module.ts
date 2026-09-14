import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})

// {
//   agent: 'agent@calytrix.test',
//   admin: 'admin@calytrix.test',
//   user: 'user@calytrix.test'
// }
export class PropertiesModule {}
