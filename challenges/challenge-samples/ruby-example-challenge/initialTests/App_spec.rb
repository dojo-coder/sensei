require 'rspec'
require_relative './App'

RSpec.describe 'longest_palindromic_substring' do
  it "returns 'bab' or 'aba' for s='babad'" do
    res = longest_palindromic_substring('babad')
    expect(['bab', 'aba']).to include(res)
  end

  it "returns 'bb' for s='cbbd'" do
    expect(longest_palindromic_substring('cbbd')).to eq('bb')
  end

  it "returns 'a' for s='a'" do
    expect(longest_palindromic_substring('a')).to eq('a')
  end

  it "returns 'aa' for s='aa'" do
    expect(longest_palindromic_substring('aa')).to eq('aa')
  end

  it "returns '' for empty string" do
    expect(longest_palindromic_substring('')).to eq('')
  end
end
