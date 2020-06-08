require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should belong_to(:channel).class_name('User').optional }
    it { should have_many(:listeners).class_name('User').with_foreign_key('channel_id') }
  end

  describe 'validations' do
    subject { FactoryBot.create(:user) }

    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }

    it do
      should validate_uniqueness_of(:email).
      ignoring_case_sensitivity.
      on(:create)
    end

    it do
      should validate_uniqueness_of(:username).
      ignoring_case_sensitivity.
      on(:create)
    end
  end
end
