import loader from '../assets/loader-circle.svg'

export const Loader: React.FC = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <img
        alt="Loader Icon"
        className="w-24 h-24"
        src={loader}
      />
    </div>
  )
}
