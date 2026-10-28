RSpec.describe 'Count to five' do
  it 'prints 1 to 5' do
    expect(DojoIO.run).to eq("1\n2\n3\n4\n5")
  end

  it 'uses a for loop' do
    expect(DojoIO.uses('for')).to be(true)
  end

  it 'does not use while' do
    expect(DojoIO.uses('while')).to be(false)
  end

  it 'has one if inside the loop' do
    expect(DojoIO.count('if@for')).to eq(1)
  end

  it 'calls puts' do
    expect(DojoIO.calls('puts')).to be(true)
  end

  it 'declares and updates total' do
    expect(DojoIO.declares('total')).to be(true)
    expect(DojoIO.uses('update:total@for')).to be(true)
  end
end
