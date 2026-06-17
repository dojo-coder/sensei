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

  it "returns 'anana' for s='banana'" do
    expect(longest_palindromic_substring('banana')).to eq('anana')
  end

  it "returns 'racecar' for s='racecar'" do
    expect(longest_palindromic_substring('racecar')).to eq('racecar')
  end

  it "returns 'madam' for s='madam'" do
    expect(longest_palindromic_substring('madam')).to eq('madam')
  end

  it "returns 'aaaa' for s='aaaa'" do
    expect(longest_palindromic_substring('aaaa')).to eq('aaaa')
  end
end
