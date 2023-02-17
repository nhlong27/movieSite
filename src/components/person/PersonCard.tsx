import { PersonType } from '@/types/types';
import React from 'react'

interface PersonCardProps {
  person: PersonType
}
const PersonCard: React.FC<PersonCardProps> = ({person}) => {
  return (
    <a href={`/celebrity/${person.id}`}>{person.name}</a>

  );
}

export default PersonCard