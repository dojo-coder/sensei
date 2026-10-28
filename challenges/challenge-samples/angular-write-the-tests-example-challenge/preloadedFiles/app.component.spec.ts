import { render, screen, fireEvent } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('Counter', () => {
  it('starts at zero', async () => {
    await render(AppComponent);
    expect(screen.getByText('Count: 0')).toBeTruthy();
  });

  // Add tests until every hidden bug is caught.
});
