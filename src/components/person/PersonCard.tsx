import { PersonType } from '@/types/types';
import React from 'react'

interface PersonCardProps {
  person: PersonType
}
const PersonCard: React.FC<PersonCardProps> = ({person}) => {
  return (
    <div>{person.name}</div>
  );
}

export default PersonCard