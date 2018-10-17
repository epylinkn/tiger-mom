#!/usr/bin/env ruby
require 'byebug'
`rm -rf ./speaker-links.txt`
`rm -rf ./speaker-bios.txt`

speaker_links = %x(curl https://www.mefest.com/2018-speakers/ | pup '.gdlr-speaker-thumbnail-overlay-link attr{href}' > speaker-links.txt)

bios = []
File.readlines('./speaker-links.txt').each_with_index do |line, i|
  line.strip!

  bio = %x(curl #{line} | pup '.gdlr-speaker-content p text{}')
  next if bio.size < 30
  bios << bio.strip.gsub(/\s+/, ' ')
end

open('speaker-bios.txt', 'a') { |f| f.puts bios }
