class Story < ActiveRecord::Base
  default_scope { where(:deleted => false).order(:time => :asc) }
end
