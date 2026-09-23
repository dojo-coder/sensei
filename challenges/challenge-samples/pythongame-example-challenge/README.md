**Space Dodger** is an arcade game written with `pygame-ce`: you fly a ship along the bottom of the screen and dodge the asteroids falling from above. The drawing, the starfield and the game loop are already written — but the ship does not answer the keyboard, the asteroids never fall and nothing ever collides.

Your job is to write the game logic in `app.py`. Open the **Preview** tab to watch the game come alive as you go.

### 1. `Ship.steer(keys)`

Called once per frame with the keyboard state (`keys[pygame.K_LEFT]` is truthy while the left arrow is held).

* **Left arrow** or **A** moves the ship left by `SPEED` pixels; **right arrow** or **D** moves it right by `SPEED` pixels.
* The ship must stay fully on screen: its centre `x` never goes below `SIZE / 2` or above `WIDTH - SIZE / 2`.
* The ship never moves vertically.

### 2. `Ship.hull()`

Returns the ship's hit box as a `pygame.Rect`: the `SIZE` x `SIZE` square centred on `(x, y)`, **shrunk by 6 pixels on every side**, so that a near miss stays a near miss.

For a ship at `(240, 570)` the hull is `pygame.Rect(229, 559, 22, 22)`.

### 3. `Asteroid.update()`

Advances the asteroid by one frame.

* It falls by `speed` and slides sideways by `drift`.
* After moving, if it sticks out past the left or right edge (`x < radius` or `x > WIDTH - radius`) it bounces: `drift` flips its sign.

### 4. `Asteroid.bounds()`

Returns the square `pygame.Rect` that wraps the asteroid: centred on `(x, y)`, with a side of twice the `radius`.

For an asteroid of radius `20` at `(100, 200)` the bounds are `pygame.Rect(80, 180, 40, 40)`.

### How it is checked

The tests never open a window — they build a `Ship` or an `Asteroid`, call your methods and compare positions and rectangles. The game loop already reports a crash when `asteroid.bounds().colliderect(ship.hull())` is true, so once both rectangles are right, collisions work on their own.

### Controls

Click the preview first so it receives the keyboard. **Arrow keys** or **A** / **D** to steer, **R** to fly again after a crash.