import 'reflect-metadata';
import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './src/app.controller';
import { AppService } from './src/app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    controller = moduleRef.get<AppController>(AppController);
  });

  it('returns "Hello, World!" on GET /', () => {
    expect(controller.getHello()).toBe('Hello, World!');
  });

  it('returns a non-empty string', () => {
    expect(controller.getHello()).toBeTruthy();
    expect(controller.getHello().length).toBeGreaterThan(0);
  });

  it('returns a string (not an object)', () => {
    expect(typeof controller.getHello()).toBe('string');
  });
});
