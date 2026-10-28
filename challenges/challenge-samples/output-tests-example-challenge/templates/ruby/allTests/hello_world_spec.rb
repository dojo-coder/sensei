RSpec.describe 'Hello World' do
  it 'prints Hello World' do
    expect(DojoIO.run).to eq('Hello World')
  end
end
