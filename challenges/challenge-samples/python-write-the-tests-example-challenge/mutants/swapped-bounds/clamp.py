def clamp(value, low, high):
    """Return value limited to the inclusive range [low, high]."""
    if low > high:
        raise ValueError('low must not be greater than high')

    if value < low:
        return high

    if value > high:
        return low

    return value
