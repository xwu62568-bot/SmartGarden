import { Link, useParams } from 'react-router-dom';
import { installerProjects } from '../../shared/mock/installer';
import { SectionCard } from '../../shared/ui/SectionCard';

export function InstallerProjectDetailPage() {
  const { projectId } = useParams();
  const project = installerProjects.find((item) => item.id === projectId);

  if (!project) {
    return <div className="muted-text">未找到项目。</div>;
  }

  return (
    <div className="stack">
      <SectionCard title={project.name}>
        {project.city ? <p className="muted-text">城市：{project.city}</p> : null}
        {project.address ? <p className="muted-text">地址：{project.address}</p> : null}
        {project.health ? <p className="muted-text">{project.health}</p> : null}
      </SectionCard>
      <Link to="/installer/projects" className="detail-link">返回项目列表</Link>
    </div>
  );
}
