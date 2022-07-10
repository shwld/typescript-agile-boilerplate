import { ProjectBoard } from './ProjectBoard';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectBoard', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <ProjectBoard />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
