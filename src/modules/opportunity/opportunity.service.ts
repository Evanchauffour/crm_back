import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Injectable()
export class OpportunityService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOpportunityDto: CreateOpportunityDto) {
    return this.prisma.opportunity.create({
      data: createOpportunityDto,
    });
  }

  findAll() {
    return this.prisma.opportunity.findMany({
      include: { client: true },
    });
  }

  findOne(id: string) {
    return this.prisma.opportunity.findUnique({
      where: { id },
      include: { client: true },
    });
  }

  update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    return this.prisma.opportunity.update({
      where: { id },
      data: updateOpportunityDto,
    });
  }

  remove(id: string) {
    return this.prisma.opportunity.delete({
      where: { id },
    });
  }
}
