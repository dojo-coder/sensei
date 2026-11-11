**Space Dodger** is an arcade game written with `pygame-ce`: a ship moves along the bottom of the screen and dodges the asteroids that fall from above. The drawing, the starfield and the game loop are given, but the ship does not answer the keyboard, the asteroids do not fall and nothing collides.

Write the game logic in `app.py`:

a. `Ship.steer(keys)` moves the ship left or right, according to the keys that are held.

b. `Ship.hull()` returns the hit box of the ship.

c. `Asteroid.update()` advances the asteroid by one frame.

d. `Asteroid.bounds()` returns the square that wraps the asteroid.

### Rules & clarifications

- `steer` is called once per frame with the keyboard state: `keys[pygame.K_LEFT]` is true while the left arrow is held.
- The left arrow or **A** moves the ship left by `SPEED` pixels; the right arrow or **D** moves it right by `SPEED` pixels. With no key held, the ship stays still.
- The ship stays fully on the screen: its centre `x` is never below `SIZE / 2` or above `WIDTH - SIZE / 2`. The ship never moves vertically.
- `hull` returns a `pygame.Rect`: the `SIZE` x `SIZE` square centred on `(x, y)`, shrunk by 6 pixels on every side.
- `update` moves the asteroid down by `speed` and sideways by `drift`. After the move, if `x < radius` or `x > WIDTH - radius`, the asteroid bounces: `drift` changes its sign.
- `bounds` returns a `pygame.Rect`: the square centred on `(x, y)`, with a side of twice the `radius`.
- The game loop reports a crash when `asteroid.bounds().colliderect(ship.hull())` is true, so collisions work as soon as both rectangles are right.
- The tests do not open a window: they create a `Ship` or an `Asteroid`, call your methods and compare positions and rectangles.
- Open the **Preview** to play. Click it first, so that it receives the keyboard; steer with the arrow keys or **A** / **D** and press **R** to fly again after a crash.

### Examples

- For a ship at `(240, 570)`, `hull()` returns `pygame.Rect(229, 559, 22, 22)` _(the 34 x 34 square, shrunk by 6 pixels on every side)_.
- For an asteroid of radius `20` at `(100, 200)`, `bounds()` returns `pygame.Rect(80, 180, 40, 40)`.
