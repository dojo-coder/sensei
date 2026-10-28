from pytest import mark as m
import pygame
from challenge.app import Ship, Asteroid, WIDTH


class Keys(dict):
    """Stands in for pygame.key.get_pressed(): every key not listed is released."""

    def __missing__(self, key):
        return False


def pressed(*keys):
    return Keys({key: True for key in keys})


def asteroid_at(x, y, radius=20, speed=3, drift=0):
    rock = Asteroid(2)
    rock.x = x
    rock.y = y
    rock.radius = radius
    rock.speed = speed
    rock.drift = drift
    return rock


@m.describe("Ship.steer")
class TestShipSteer:
    @m.it("Should move left by SPEED when the left arrow is held")
    def test_left_arrow(self):
        ship = Ship()
        start = ship.x
        ship.steer(pressed(pygame.K_LEFT))
        assert ship.x == start - Ship.SPEED

    @m.it("Should move right by SPEED when the right arrow is held")
    def test_right_arrow(self):
        ship = Ship()
        start = ship.x
        ship.steer(pressed(pygame.K_RIGHT))
        assert ship.x == start + Ship.SPEED

    @m.it("Should also steer with A and D")
    def test_a_and_d(self):
        ship = Ship()
        start = ship.x
        ship.steer(pressed(pygame.K_a))
        assert ship.x == start - Ship.SPEED
        ship.steer(pressed(pygame.K_d))
        ship.steer(pressed(pygame.K_d))
        assert ship.x == start + Ship.SPEED

    @m.it("Should stay still when no key is held")
    def test_no_key(self):
        ship = Ship()
        start = ship.x
        ship.steer(pressed())
        assert ship.x == start

    @m.it("Should never move vertically")
    def test_keeps_altitude(self):
        ship = Ship()
        start = ship.y
        ship.steer(pressed(pygame.K_LEFT))
        ship.steer(pressed(pygame.K_RIGHT))
        assert ship.y == start

    @m.it("Should stop at the left edge of the screen")
    def test_clamped_left(self):
        ship = Ship()
        for _ in range(500):
            ship.steer(pressed(pygame.K_LEFT))
        assert ship.x == Ship.SIZE / 2

    @m.it("Should stop at the right edge of the screen")
    def test_clamped_right(self):
        ship = Ship()
        for _ in range(500):
            ship.steer(pressed(pygame.K_RIGHT))
        assert ship.x == WIDTH - Ship.SIZE / 2


@m.describe("Ship.hull")
class TestShipHull:
    @m.it("Should be the ship's square shrunk by 6 pixels on every side")
    def test_default_position(self):
        ship = Ship()
        ship.x, ship.y = 240, 570
        assert ship.hull() == pygame.Rect(229, 559, 22, 22)

    @m.it("Should follow the ship when it moves")
    def test_follows_ship(self):
        ship = Ship()
        ship.x, ship.y = 100, 300
        assert ship.hull() == pygame.Rect(89, 289, 22, 22)


@m.describe("Asteroid.update")
class TestAsteroidUpdate:
    @m.it("Should fall by its speed on every update")
    def test_falls(self):
        rock = asteroid_at(200, 50, speed=3)
        rock.update()
        assert rock.y == 53
        rock.update()
        assert rock.y == 56

    @m.it("Should slide sideways by its drift")
    def test_drifts(self):
        rock = asteroid_at(200, 50, drift=0.5)
        rock.update()
        assert rock.x == 200.5

    @m.it("Should keep its drift while it is away from the edges")
    def test_no_bounce_in_the_middle(self):
        rock = asteroid_at(200, 50, drift=-0.5)
        rock.update()
        assert rock.drift == -0.5

    @m.it("Should bounce off the left edge")
    def test_bounce_left(self):
        rock = asteroid_at(20, 50, radius=20, drift=-0.5)
        rock.update()
        assert rock.drift == 0.5

    @m.it("Should bounce off the right edge")
    def test_bounce_right(self):
        rock = asteroid_at(WIDTH - 20, 50, radius=20, drift=0.5)
        rock.update()
        assert rock.drift == -0.5


@m.describe("Asteroid.bounds")
class TestAsteroidBounds:
    @m.it("Should be the square that wraps the asteroid")
    def test_bounds(self):
        rock = asteroid_at(100, 200, radius=20)
        assert rock.bounds() == pygame.Rect(80, 180, 40, 40)

    @m.it("Should grow with the radius")
    def test_bounds_radius(self):
        rock = asteroid_at(100, 200, radius=12)
        assert rock.bounds() == pygame.Rect(88, 188, 24, 24)


@m.describe("Collisions")
class TestCollisions:
    @m.it("Should hit the ship when the asteroid overlaps its hull")
    def test_hit(self):
        ship = Ship()
        rock = asteroid_at(ship.x, ship.y)
        assert rock.bounds().colliderect(ship.hull())

    @m.it("Should miss the ship when the asteroid is far away")
    def test_far_miss(self):
        ship = Ship()
        rock = asteroid_at(40, 40)
        assert not rock.bounds().colliderect(ship.hull())

    @m.it("Should forgive a near miss that only grazes the ship's outline")
    def test_near_miss(self):
        ship = Ship()
        ship.x, ship.y = 240, 570
        rock = asteroid_at(206, 570, radius=20)
        assert not rock.bounds().colliderect(ship.hull())
