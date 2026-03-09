import { Controller, Post, Body } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async postOrder(@Body(JoiPipe) body: PostOrdersDTO): Promise<NewOrderDTO>  {
    return <NewOrderDTO>{
      total: orders.length,
      items: orders,
    };
  }
}
