import asyncio
import random

import pygame

WIDTH = 480
HEIGHT = 640
FPS = 60

SPACE = (8, 8, 20)
WHITE = (235, 235, 245)
CYAN = (90, 220, 240)
MAGENTA = (240, 90, 180)
AMBER = (250, 190, 80)
RED = (235, 70, 90)


class Starfield:
    """Parallax backdrop: stars fall at their own speed, so the ship reads as moving."""

    def __init__(self):
        self.stars = []
        for _ in range(80):
            self.stars.append([random.randint(0, WIDTH), random.randint(0, HEIGHT), random.uniform(0.3, 1.8)])

    def draw(self, surface):
        for star in self.stars:
            star[1] += star[2]
            if star[1] > HEIGHT:
                star[0] = random.randint(0, WIDTH)
                star[1] = -2
            shade = int(80 + star[2] * 80)
            surface.fill((shade, shade, min(255, shade + 20)), (int(star[0]), int(star[1]), 2, 2))


class Ship:
    SIZE = 34
    SPEED = 6

    def __init__(self):
        self.x = WIDTH / 2
        self.y = HEIGHT - 70

    def steer(self, keys):
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            self.x -= self.SPEED
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            self.x += self.SPEED
        half = self.SIZE / 2
        self.x = max(half, min(WIDTH - half, self.x))

    def hull(self):
        half = self.SIZE / 2
        return pygame.Rect(self.x - half + 6, self.y - half + 6, self.SIZE - 12, self.SIZE - 12)

    def draw(self, surface):
        half = self.SIZE / 2
        nose = (self.x, self.y - half)
        left = (self.x - half, self.y + half)
        right = (self.x + half, self.y + half)
        thrust = random.randint(8, 18)
        pygame.draw.polygon(surface, AMBER, [(self.x - 7, self.y + half), (self.x + 7, self.y + half), (self.x, self.y + half + thrust)])
        pygame.draw.polygon(surface, CYAN, [nose, left, right])
        pygame.draw.polygon(surface, WHITE, [nose, left, right], 2)


class Asteroid:
    def __init__(self, speed):
        self.radius = random.randint(12, 26)
        self.x = random.randint(self.radius, WIDTH - self.radius)
        self.y = -self.radius
        self.speed = speed + random.uniform(0, 1.5)
        self.drift = random.uniform(-0.8, 0.8)

    def update(self):
        self.y += self.speed
        self.x += self.drift
        if self.x < self.radius or self.x > WIDTH - self.radius:
            self.drift = -self.drift

    def bounds(self):
        return pygame.Rect(self.x - self.radius, self.y - self.radius, self.radius * 2, self.radius * 2)

    def draw(self, surface):
        center = (int(self.x), int(self.y))
        pygame.draw.circle(surface, MAGENTA, center, self.radius)
        pygame.draw.circle(surface, WHITE, center, self.radius, 2)
        pygame.draw.circle(surface, SPACE, (center[0] - 5, center[1] - 4), max(2, self.radius // 4))


def centered(surface, font, text, color, y):
    label = font.render(text, True, color)
    surface.blit(label, (WIDTH / 2 - label.get_width() / 2, y))


async def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Space Dodger")
    clock = pygame.time.Clock()
    small = pygame.font.Font(None, 26)
    big = pygame.font.Font(None, 58)

    stars = Starfield()
    ship = Ship()
    asteroids = []
    ticks = 0
    best = 0
    spawn = 0
    alive = True
    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN and not alive:
                if event.key in (pygame.K_r, pygame.K_SPACE, pygame.K_RETURN):
                    ship = Ship()
                    asteroids = []
                    ticks = 0
                    spawn = 0
                    alive = True

        screen.fill(SPACE)
        stars.draw(screen)

        if alive:
            ship.steer(pygame.key.get_pressed())
            ticks += 1
            level = 1 + ticks // 420
            spawn += 1
            if spawn >= max(10, 32 - level * 3):
                spawn = 0
                asteroids.append(Asteroid(2.2 + level * 0.5))
            for rock in asteroids:
                rock.update()
            asteroids = [r for r in asteroids if r.y - r.radius < HEIGHT + 20]
            box = ship.hull()
            for rock in asteroids:
                if rock.bounds().colliderect(box):
                    alive = False
                    best = max(best, ticks)

        for rock in asteroids:
            rock.draw(screen)
        if alive:
            ship.draw(screen)

        screen.blit(small.render("SCORE " + str(ticks // 6), True, WHITE), (16, 16))
        screen.blit(small.render("BEST " + str(best // 6), True, AMBER), (16, 44))

        if alive:
            centered(screen, small, "Arrow keys or A / D to dodge", (120, 120, 140), HEIGHT - 28)
        else:
            veil = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
            veil.fill((8, 8, 20, 190))
            screen.blit(veil, (0, 0))
            centered(screen, big, "GAME OVER", RED, HEIGHT / 2 - 70)
            centered(screen, small, "You scored " + str(ticks // 6), WHITE, HEIGHT / 2)
            centered(screen, small, "Press R to fly again", CYAN, HEIGHT / 2 + 34)

        pygame.display.flip()
        clock.tick(FPS)
        await asyncio.sleep(0)

    pygame.quit()
